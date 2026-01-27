# Database Migration Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Database migration testing ensures that database schema changes, data transformations, and version upgrades execute correctly without data loss or corruption. For test automation professionals, migration testing is critical for maintaining data integrity during application evolution.

## What is Database Migration Testing?

Database migration testing validates that changes to database structure and content—such as adding columns, modifying data types, or transforming data—complete successfully while preserving data integrity and application functionality.

### Types of Database Migrations

```
┌─────────────────────────────────────────────────────────────┐
│                    Migration Types                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Schema Migrations:                                         │
│  ├── Add/remove tables                                      │
│  ├── Add/remove columns                                     │
│  ├── Modify data types                                      │
│  ├── Add/remove indexes                                     │
│  └── Add/remove constraints                                 │
│                                                             │
│  Data Migrations:                                           │
│  ├── Transform existing data                                │
│  ├── Populate new columns                                   │
│  ├── Merge/split tables                                     │
│  └── Archive old data                                       │
│                                                             │
│  Platform Migrations:                                       │
│  ├── Database version upgrades                              │
│  ├── Database engine changes                                │
│  └── Cloud provider migrations                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Migration Testing Framework

### Python Migration Test Suite

```python
import pytest
from sqlalchemy import create_engine, text, inspect
from alembic import command
from alembic.config import Config
import hashlib
import json
from datetime import datetime
from typing import Dict, List, Any

class MigrationTestFramework:
    """Framework for testing database migrations."""

    def __init__(self, database_url: str, alembic_config_path: str):
        self.database_url = database_url
        self.engine = create_engine(database_url)
        self.alembic_cfg = Config(alembic_config_path)
        self.alembic_cfg.set_main_option("sqlalchemy.url", database_url)

    def get_current_revision(self) -> str:
        """Get current migration revision."""
        with self.engine.connect() as conn:
            result = conn.execute(text(
                "SELECT version_num FROM alembic_version"
            ))
            row = result.fetchone()
            return row[0] if row else None

    def upgrade_to(self, revision: str = "head"):
        """Run migrations up to specified revision."""
        command.upgrade(self.alembic_cfg, revision)

    def downgrade_to(self, revision: str):
        """Downgrade to specified revision."""
        command.downgrade(self.alembic_cfg, revision)

    def get_table_schema(self, table_name: str) -> Dict:
        """Get schema information for a table."""
        inspector = inspect(self.engine)

        return {
            'columns': {
                col['name']: {
                    'type': str(col['type']),
                    'nullable': col['nullable'],
                    'default': col.get('default')
                }
                for col in inspector.get_columns(table_name)
            },
            'indexes': inspector.get_indexes(table_name),
            'foreign_keys': inspector.get_foreign_keys(table_name),
            'primary_key': inspector.get_pk_constraint(table_name)
        }

    def snapshot_data(self, table_name: str, key_column: str) -> Dict[str, str]:
        """Create checksums of data for comparison."""
        with self.engine.connect() as conn:
            result = conn.execute(text(f"SELECT * FROM {table_name}"))
            rows = result.fetchall()
            columns = result.keys()

            checksums = {}
            for row in rows:
                row_dict = dict(zip(columns, row))
                key = str(row_dict[key_column])
                checksum = hashlib.md5(
                    json.dumps(row_dict, default=str, sort_keys=True).encode()
                ).hexdigest()
                checksums[key] = checksum

            return checksums

    def count_rows(self, table_name: str) -> int:
        """Count rows in a table."""
        with self.engine.connect() as conn:
            result = conn.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
            return result.scalar()


class MigrationTestCase:
    """Base class for migration tests."""

    def __init__(self, framework: MigrationTestFramework):
        self.framework = framework

    def verify_schema_after_migration(
        self,
        table_name: str,
        expected_columns: List[str],
        expected_types: Dict[str, str] = None
    ):
        """Verify table schema after migration."""
        schema = self.framework.get_table_schema(table_name)
        actual_columns = set(schema['columns'].keys())
        expected_set = set(expected_columns)

        assert expected_set <= actual_columns, \
            f"Missing columns: {expected_set - actual_columns}"

        if expected_types:
            for col_name, expected_type in expected_types.items():
                actual_type = schema['columns'][col_name]['type']
                assert expected_type.upper() in actual_type.upper(), \
                    f"Column {col_name}: expected {expected_type}, got {actual_type}"

    def verify_data_preserved(
        self,
        table_name: str,
        key_column: str,
        pre_migration_checksums: Dict[str, str],
        columns_to_ignore: List[str] = None
    ):
        """Verify data integrity after migration."""
        post_checksums = self.framework.snapshot_data(table_name, key_column)

        # Check no data was lost
        pre_keys = set(pre_migration_checksums.keys())
        post_keys = set(post_checksums.keys())

        lost_keys = pre_keys - post_keys
        assert not lost_keys, f"Data lost for keys: {lost_keys}"

        # If ignoring columns, just check row count
        if columns_to_ignore:
            assert len(pre_keys) == len(post_keys), "Row count changed"
        else:
            # Check data wasn't corrupted
            for key in pre_keys:
                if key in post_keys:
                    assert pre_migration_checksums[key] == post_checksums[key], \
                        f"Data changed for key {key}"

    def verify_migration_reversible(
        self,
        target_revision: str,
        original_revision: str
    ):
        """Verify migration can be rolled back."""
        # Upgrade
        self.framework.upgrade_to(target_revision)
        assert self.framework.get_current_revision() == target_revision

        # Downgrade
        self.framework.downgrade_to(original_revision)
        assert self.framework.get_current_revision() == original_revision


# Example test suite
class TestUserTableMigration:
    """Test suite for user table migrations."""

    @pytest.fixture
    def migration_framework(self, test_database_url):
        return MigrationTestFramework(
            database_url=test_database_url,
            alembic_config_path="alembic.ini"
        )

    @pytest.fixture
    def migration_test(self, migration_framework):
        return MigrationTestCase(migration_framework)

    def test_add_email_verified_column(
        self,
        migration_framework,
        migration_test
    ):
        """Test migration that adds email_verified column."""
        # Setup: ensure at starting revision
        migration_framework.downgrade_to("abc123")

        # Snapshot pre-migration data
        pre_checksums = migration_framework.snapshot_data("users", "id")
        pre_count = migration_framework.count_rows("users")

        # Run migration
        migration_framework.upgrade_to("def456")

        # Verify schema
        migration_test.verify_schema_after_migration(
            table_name="users",
            expected_columns=["id", "email", "name", "email_verified"],
            expected_types={"email_verified": "BOOLEAN"}
        )

        # Verify data count preserved
        post_count = migration_framework.count_rows("users")
        assert pre_count == post_count, "Row count changed during migration"

        # Verify default value applied
        with migration_framework.engine.connect() as conn:
            result = conn.execute(text(
                "SELECT COUNT(*) FROM users WHERE email_verified = false"
            ))
            assert result.scalar() == pre_count, "Default value not applied"

    def test_migration_rollback(
        self,
        migration_framework,
        migration_test
    ):
        """Test that migration can be rolled back."""
        migration_test.verify_migration_reversible(
            target_revision="def456",
            original_revision="abc123"
        )
```

### JavaScript Migration Testing

```typescript
// migration-test-framework.ts
import { Knex, knex } from 'knex';
import * as crypto from 'crypto';

interface TableSchema {
  columns: Record<string, ColumnInfo>;
  indexes: IndexInfo[];
}

interface ColumnInfo {
  type: string;
  nullable: boolean;
  defaultValue: any;
}

interface IndexInfo {
  name: string;
  columns: string[];
  unique: boolean;
}

class MigrationTestFramework {
  private db: Knex;

  constructor(config: Knex.Config) {
    this.db = knex(config);
  }

  async runMigrations(): Promise<void> {
    await this.db.migrate.latest();
  }

  async rollbackMigration(): Promise<void> {
    await this.db.migrate.rollback();
  }

  async rollbackAll(): Promise<void> {
    await this.db.migrate.rollback(undefined, true);
  }

  async migrateToVersion(version: string): Promise<void> {
    await this.db.migrate.up({ name: version });
  }

  async getTableSchema(tableName: string): Promise<TableSchema> {
    const columns = await this.db(tableName).columnInfo();

    const columnInfo: Record<string, ColumnInfo> = {};
    for (const [name, info] of Object.entries(columns)) {
      columnInfo[name] = {
        type: (info as any).type,
        nullable: (info as any).nullable,
        defaultValue: (info as any).defaultValue
      };
    }

    return {
      columns: columnInfo,
      indexes: [] // Would need raw query to get indexes
    };
  }

  async snapshotData(
    tableName: string,
    keyColumn: string
  ): Promise<Map<string, string>> {
    const rows = await this.db(tableName).select('*');
    const checksums = new Map<string, string>();

    for (const row of rows) {
      const key = String(row[keyColumn]);
      const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(row))
        .digest('hex');
      checksums.set(key, hash);
    }

    return checksums;
  }

  async countRows(tableName: string): Promise<number> {
    const result = await this.db(tableName).count('* as count').first();
    return Number(result?.count || 0);
  }

  async tableExists(tableName: string): Promise<boolean> {
    return this.db.schema.hasTable(tableName);
  }

  async columnExists(tableName: string, columnName: string): Promise<boolean> {
    return this.db.schema.hasColumn(tableName, columnName);
  }

  async close(): Promise<void> {
    await this.db.destroy();
  }
}

// Test utilities
class MigrationAssertions {
  constructor(private framework: MigrationTestFramework) {}

  async assertTableExists(tableName: string): Promise<void> {
    const exists = await this.framework.tableExists(tableName);
    if (!exists) {
      throw new Error(`Table ${tableName} does not exist`);
    }
  }

  async assertColumnExists(
    tableName: string,
    columnName: string
  ): Promise<void> {
    const exists = await this.framework.columnExists(tableName, columnName);
    if (!exists) {
      throw new Error(`Column ${columnName} does not exist in ${tableName}`);
    }
  }

  async assertColumnType(
    tableName: string,
    columnName: string,
    expectedType: string
  ): Promise<void> {
    const schema = await this.framework.getTableSchema(tableName);
    const column = schema.columns[columnName];

    if (!column) {
      throw new Error(`Column ${columnName} not found in ${tableName}`);
    }

    if (!column.type.toLowerCase().includes(expectedType.toLowerCase())) {
      throw new Error(
        `Column ${columnName} type mismatch: expected ${expectedType}, got ${column.type}`
      );
    }
  }

  async assertRowCount(
    tableName: string,
    expectedCount: number
  ): Promise<void> {
    const actualCount = await this.framework.countRows(tableName);
    if (actualCount !== expectedCount) {
      throw new Error(
        `Row count mismatch in ${tableName}: expected ${expectedCount}, got ${actualCount}`
      );
    }
  }

  async assertDataPreserved(
    tableName: string,
    keyColumn: string,
    preSnapshot: Map<string, string>
  ): Promise<void> {
    const postSnapshot = await this.framework.snapshotData(tableName, keyColumn);

    for (const [key, preHash] of preSnapshot) {
      const postHash = postSnapshot.get(key);
      if (!postHash) {
        throw new Error(`Data lost for key ${key}`);
      }
    }
  }
}

// Example Jest tests
describe('Database Migrations', () => {
  let framework: MigrationTestFramework;
  let assertions: MigrationAssertions;

  beforeAll(async () => {
    framework = new MigrationTestFramework({
      client: 'postgresql',
      connection: process.env.TEST_DATABASE_URL
    });
    assertions = new MigrationAssertions(framework);

    // Start fresh
    await framework.rollbackAll();
  });

  afterAll(async () => {
    await framework.close();
  });

  describe('Initial migration', () => {
    test('creates users table', async () => {
      await framework.runMigrations();

      await assertions.assertTableExists('users');
      await assertions.assertColumnExists('users', 'id');
      await assertions.assertColumnExists('users', 'email');
      await assertions.assertColumnType('users', 'email', 'varchar');
    });

    test('can be rolled back', async () => {
      await framework.rollbackMigration();

      const exists = await framework.tableExists('users');
      expect(exists).toBe(false);
    });
  });

  describe('Add profile fields migration', () => {
    let preSnapshot: Map<string, string>;
    let preCount: number;

    beforeAll(async () => {
      // Setup: run all migrations and seed data
      await framework.runMigrations();

      // Snapshot before the migration we're testing
      preSnapshot = await framework.snapshotData('users', 'id');
      preCount = await framework.countRows('users');
    });

    test('preserves existing data', async () => {
      await assertions.assertDataPreserved('users', 'id', preSnapshot);
    });

    test('maintains row count', async () => {
      await assertions.assertRowCount('users', preCount);
    });
  });
});
```

## Data Migration Testing

### Testing Data Transformations

```python
class DataMigrationTester:
    """Test data transformations during migrations."""

    def __init__(self, engine):
        self.engine = engine

    def test_data_transformation(
        self,
        table_name: str,
        transformation_query: str,
        validation_query: str,
        expected_results: List[Dict]
    ):
        """
        Test that a data transformation produces expected results.
        """
        with self.engine.connect() as conn:
            # Run transformation
            conn.execute(text(transformation_query))

            # Validate results
            result = conn.execute(text(validation_query))
            actual_results = [dict(row) for row in result]

            assert actual_results == expected_results, \
                f"Transformation produced unexpected results"

    def test_null_handling(
        self,
        table_name: str,
        column_name: str,
        expected_null_count: int = 0
    ):
        """Verify null handling in migrations."""
        with self.engine.connect() as conn:
            result = conn.execute(text(f"""
                SELECT COUNT(*) FROM {table_name}
                WHERE {column_name} IS NULL
            """))
            null_count = result.scalar()

            assert null_count == expected_null_count, \
                f"Unexpected nulls: {null_count} (expected {expected_null_count})"

    def test_data_type_conversion(
        self,
        table_name: str,
        column_name: str,
        sample_values: List[tuple]
    ):
        """
        Test data type conversions.
        sample_values: List of (id, expected_value) tuples
        """
        with self.engine.connect() as conn:
            for record_id, expected in sample_values:
                result = conn.execute(text(f"""
                    SELECT {column_name} FROM {table_name}
                    WHERE id = :id
                """), {"id": record_id})
                actual = result.scalar()

                assert actual == expected, \
                    f"Record {record_id}: expected {expected}, got {actual}"


# Example: Testing a complex data migration
class TestOrderStatusMigration:
    """
    Test migration that converts order status from string to enum.
    Old: 'pending', 'processing', 'shipped', 'delivered'
    New: 1, 2, 3, 4
    """

    @pytest.fixture
    def tester(self, test_engine):
        return DataMigrationTester(test_engine)

    @pytest.fixture
    def setup_test_data(self, test_engine):
        """Insert test data with various status values."""
        with test_engine.connect() as conn:
            conn.execute(text("""
                INSERT INTO orders (id, customer_id, status, total)
                VALUES
                    (1, 100, 'pending', 50.00),
                    (2, 101, 'processing', 75.00),
                    (3, 102, 'shipped', 100.00),
                    (4, 103, 'delivered', 25.00),
                    (5, 104, 'pending', 200.00)
            """))
            conn.commit()

    def test_status_conversion(self, tester, setup_test_data, run_migration):
        """Test that string statuses convert to correct integers."""
        tester.test_data_type_conversion(
            table_name="orders",
            column_name="status_id",
            sample_values=[
                (1, 1),  # pending -> 1
                (2, 2),  # processing -> 2
                (3, 3),  # shipped -> 3
                (4, 4),  # delivered -> 4
            ]
        )

    def test_no_null_status(self, tester, setup_test_data, run_migration):
        """Verify no orders have null status after migration."""
        tester.test_null_handling(
            table_name="orders",
            column_name="status_id",
            expected_null_count=0
        )
```

## Migration Performance Testing

```python
import time
from contextlib import contextmanager

class MigrationPerformanceTester:
    """Test migration performance and resource usage."""

    def __init__(self, engine):
        self.engine = engine

    @contextmanager
    def measure_time(self):
        """Context manager to measure execution time."""
        start = time.time()
        yield
        self.last_duration = time.time() - start

    def test_migration_duration(
        self,
        migration_func,
        max_duration_seconds: float,
        row_count: int = None
    ):
        """Test that migration completes within time limit."""
        with self.measure_time():
            migration_func()

        assert self.last_duration < max_duration_seconds, \
            f"Migration took {self.last_duration:.2f}s, limit is {max_duration_seconds}s"

        if row_count:
            rows_per_second = row_count / self.last_duration
            print(f"Migration processed {rows_per_second:.0f} rows/second")

    def test_migration_with_load(
        self,
        migration_func,
        concurrent_queries: int = 10
    ):
        """Test migration while database is under load."""
        import concurrent.futures

        def run_query():
            with self.engine.connect() as conn:
                for _ in range(100):
                    conn.execute(text("SELECT 1"))
                    time.sleep(0.01)

        # Start background load
        with concurrent.futures.ThreadPoolExecutor(max_workers=concurrent_queries) as executor:
            futures = [executor.submit(run_query) for _ in range(concurrent_queries)]

            # Run migration while load is happening
            with self.measure_time():
                migration_func()

            # Wait for background queries to complete
            concurrent.futures.wait(futures)

        print(f"Migration under load completed in {self.last_duration:.2f}s")

    def test_lock_duration(
        self,
        migration_func,
        max_lock_seconds: float = 5.0
    ):
        """Test that migration doesn't hold locks too long."""
        # This is database-specific, example for PostgreSQL
        with self.engine.connect() as conn:
            # Start monitoring locks
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS lock_monitor (
                    id SERIAL PRIMARY KEY,
                    lock_start TIMESTAMP,
                    lock_end TIMESTAMP
                )
            """))

        # Run migration and monitor
        # Implementation depends on database system
        pass


# Example performance tests
class TestLargeMigrationPerformance:
    """Performance tests for migrations on large tables."""

    @pytest.fixture
    def perf_tester(self, test_engine):
        return MigrationPerformanceTester(test_engine)

    @pytest.fixture
    def large_dataset(self, test_engine):
        """Create a large test dataset."""
        with test_engine.connect() as conn:
            # Insert 100,000 test rows
            conn.execute(text("""
                INSERT INTO large_table (data)
                SELECT md5(random()::text)
                FROM generate_series(1, 100000)
            """))
            conn.commit()
        return 100000

    def test_index_creation_performance(
        self,
        perf_tester,
        large_dataset
    ):
        """Test that index creation completes in reasonable time."""
        def create_index():
            with perf_tester.engine.connect() as conn:
                conn.execute(text(
                    "CREATE INDEX CONCURRENTLY idx_data ON large_table(data)"
                ))

        perf_tester.test_migration_duration(
            migration_func=create_index,
            max_duration_seconds=60,
            row_count=large_dataset
        )
```

## Best Practices

### Migration Testing Checklist

```markdown
## Database Migration Testing Checklist

### Pre-Migration
- [ ] Backup test database
- [ ] Document current schema
- [ ] Snapshot critical data
- [ ] Identify affected queries/procedures
- [ ] Review migration script

### Schema Changes
- [ ] Verify new tables created
- [ ] Verify new columns added
- [ ] Verify column types correct
- [ ] Verify indexes created
- [ ] Verify constraints applied
- [ ] Verify foreign keys correct

### Data Integrity
- [ ] Row counts preserved
- [ ] No orphaned records
- [ ] Null handling correct
- [ ] Default values applied
- [ ] Data transformations correct

### Rollback
- [ ] Migration is reversible
- [ ] Rollback restores schema
- [ ] Rollback preserves data
- [ ] Application works after rollback

### Performance
- [ ] Migration completes in time limit
- [ ] No excessive locking
- [ ] Index usage verified
- [ ] Query performance maintained

### Application Compatibility
- [ ] Application starts after migration
- [ ] All queries execute successfully
- [ ] No breaking changes to API
- [ ] ORM mappings updated
```

## Conclusion

Database migration testing is essential for maintaining data integrity and application reliability during database evolution. By thoroughly testing schema changes, data transformations, and rollback capabilities, test automation professionals can ensure smooth database updates in production environments.

## Key Takeaways

1. Test schema changes verify structure after migration
2. Data integrity tests prevent data loss
3. Always test rollback/downgrade capability
4. Performance test migrations on realistic data volumes
5. Snapshot data before migration for comparison
6. Test migrations under concurrent load
7. Automate migration tests in CI/CD pipeline
