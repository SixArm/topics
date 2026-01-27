# Command-Line Interface Testing: A Comprehensive Tutorial for Test Automation Professionals

## Introduction

Command-line interface (CLI) testing validates applications that are operated through text commands in a terminal. For test automation professionals, CLI testing is essential for testing developer tools, build scripts, deployment utilities, and any application that provides a command-line interface.

## What is CLI Testing?

CLI testing verifies that command-line applications correctly parse arguments, produce expected output, handle errors gracefully, and integrate with system components like file systems and environment variables.

### CLI Testing Scope

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI Testing Scope                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Input Validation                                           │
│  └── Arguments, flags, options, environment variables       │
│                                                             │
│  Output Verification                                        │
│  └── stdout, stderr, exit codes, file output                │
│                                                             │
│  Behavior Testing                                           │
│  └── Commands execute correctly, state changes              │
│                                                             │
│  Error Handling                                             │
│  └── Invalid inputs, missing files, permission errors       │
│                                                             │
│  Integration                                                │
│  └── File system, network, other commands, pipes            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing CLI Applications

### Basic CLI Test Structure

```javascript
const { execSync, spawn } = require('child_process');
const assert = require('assert');

describe('CLI Tests', () => {
  describe('mycli --version', () => {
    it('should display version number', () => {
      const output = execSync('mycli --version').toString();
      assert.match(output, /\d+\.\d+\.\d+/);
    });
  });

  describe('mycli --help', () => {
    it('should display help text', () => {
      const output = execSync('mycli --help').toString();
      assert(output.includes('Usage:'));
      assert(output.includes('Options:'));
    });
  });

  describe('mycli process <file>', () => {
    it('should process file and output result', () => {
      const output = execSync('mycli process test.txt').toString();
      assert(output.includes('Processed successfully'));
    });

    it('should return error for missing file', () => {
      try {
        execSync('mycli process nonexistent.txt');
        assert.fail('Should have thrown');
      } catch (error) {
        assert.strictEqual(error.status, 1);
        assert(error.stderr.toString().includes('File not found'));
      }
    });
  });
});
```

### Python CLI Testing with subprocess

```python
import subprocess
import pytest
import os

class TestCLI:
    """Test suite for CLI application."""

    def run_cli(self, *args, input_text=None, env=None):
        """Helper to run CLI command."""
        result = subprocess.run(
            ['mycli', *args],
            capture_output=True,
            text=True,
            input=input_text,
            env={**os.environ, **(env or {})}
        )
        return result

    def test_version_flag(self):
        """Test --version displays version."""
        result = self.run_cli('--version')

        assert result.returncode == 0
        assert '1.0.0' in result.stdout

    def test_help_flag(self):
        """Test --help displays usage information."""
        result = self.run_cli('--help')

        assert result.returncode == 0
        assert 'Usage:' in result.stdout
        assert 'Commands:' in result.stdout

    def test_process_file(self, tmp_path):
        """Test processing a file."""
        # Create test file
        test_file = tmp_path / "test.txt"
        test_file.write_text("Hello, World!")

        result = self.run_cli('process', str(test_file))

        assert result.returncode == 0
        assert 'Processed' in result.stdout

    def test_missing_file_error(self):
        """Test error handling for missing file."""
        result = self.run_cli('process', 'nonexistent.txt')

        assert result.returncode == 1
        assert 'Error' in result.stderr
        assert 'not found' in result.stderr.lower()

    def test_invalid_argument(self):
        """Test error for invalid argument."""
        result = self.run_cli('--invalid-flag')

        assert result.returncode != 0
        assert 'unknown' in result.stderr.lower() or 'invalid' in result.stderr.lower()

    def test_environment_variable(self):
        """Test environment variable handling."""
        result = self.run_cli('config', 'show', env={'MYCLI_DEBUG': 'true'})

        assert result.returncode == 0
        assert 'debug: true' in result.stdout.lower()

    def test_stdin_input(self):
        """Test reading from stdin."""
        result = self.run_cli('process', '-', input_text='test input')

        assert result.returncode == 0
        assert 'Processed' in result.stdout

    def test_quiet_mode(self):
        """Test quiet mode suppresses output."""
        result = self.run_cli('process', 'test.txt', '--quiet')

        assert result.returncode == 0
        assert result.stdout == '' or result.stdout.strip() == ''

    def test_verbose_mode(self):
        """Test verbose mode shows detailed output."""
        result = self.run_cli('process', 'test.txt', '--verbose')

        assert result.returncode == 0
        assert 'DEBUG' in result.stdout or 'INFO' in result.stdout
```

### Testing Exit Codes

```python
class TestExitCodes:
    """Test CLI exit codes."""

    EXIT_SUCCESS = 0
    EXIT_ERROR = 1
    EXIT_USAGE_ERROR = 2
    EXIT_CONFIG_ERROR = 3

    def test_success_exit_code(self):
        """Successful command returns 0."""
        result = subprocess.run(['mycli', '--version'], capture_output=True)
        assert result.returncode == self.EXIT_SUCCESS

    def test_error_exit_code(self):
        """Error returns non-zero exit code."""
        result = subprocess.run(
            ['mycli', 'process', 'nonexistent.txt'],
            capture_output=True
        )
        assert result.returncode == self.EXIT_ERROR

    def test_usage_error_exit_code(self):
        """Invalid usage returns specific exit code."""
        result = subprocess.run(
            ['mycli', '--invalid'],
            capture_output=True
        )
        assert result.returncode == self.EXIT_USAGE_ERROR

    @pytest.mark.parametrize("command,expected_exit", [
        (['--version'], 0),
        (['--help'], 0),
        (['process', 'valid.txt'], 0),
        (['process', 'missing.txt'], 1),
        (['--bad-flag'], 2),
        (['config', 'invalid'], 1),
    ])
    def test_exit_codes(self, command, expected_exit, tmp_path):
        """Test various exit codes."""
        # Create valid.txt if needed
        if 'valid.txt' in command:
            (tmp_path / 'valid.txt').write_text('content')
            command = [c.replace('valid.txt', str(tmp_path / 'valid.txt')) for c in command]

        result = subprocess.run(['mycli'] + command, capture_output=True)
        assert result.returncode == expected_exit
```

## Testing Interactive CLIs

### Testing with pexpect

```python
import pexpect
import pytest

class TestInteractiveCLI:
    """Test interactive CLI prompts."""

    def test_interactive_setup(self):
        """Test interactive setup wizard."""
        child = pexpect.spawn('mycli setup')

        # Expect first prompt
        child.expect('Enter your name:')
        child.sendline('Test User')

        # Expect second prompt
        child.expect('Enter your email:')
        child.sendline('test@example.com')

        # Expect confirmation
        child.expect('Configuration saved')

        child.expect(pexpect.EOF)
        assert child.exitstatus == 0

    def test_confirmation_prompt_yes(self):
        """Test confirmation prompt accepting yes."""
        child = pexpect.spawn('mycli delete item-123')

        child.expect('Are you sure.*\\[y/N\\]')
        child.sendline('y')

        child.expect('Deleted')
        child.expect(pexpect.EOF)
        assert child.exitstatus == 0

    def test_confirmation_prompt_no(self):
        """Test confirmation prompt rejecting."""
        child = pexpect.spawn('mycli delete item-123')

        child.expect('Are you sure.*\\[y/N\\]')
        child.sendline('n')

        child.expect('Cancelled')
        child.expect(pexpect.EOF)
        assert child.exitstatus == 0

    def test_password_prompt(self):
        """Test password input (hidden)."""
        child = pexpect.spawn('mycli login')

        child.expect('Username:')
        child.sendline('admin')

        child.expect('Password:')
        child.sendline('secret123')  # Not echoed

        child.expect('Login successful')
        child.expect(pexpect.EOF)

    def test_timeout_handling(self):
        """Test prompt timeout."""
        child = pexpect.spawn('mycli setup', timeout=5)

        child.expect('Enter your name:')
        # Don't respond, let it timeout

        with pytest.raises(pexpect.TIMEOUT):
            child.expect('Enter your email:', timeout=2)
```

### Testing with Node.js

```javascript
const { spawn } = require('child_process');

function runInteractiveCLI(command, args, interactions) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    let stdout = '';
    let stderr = '';
    let interactionIndex = 0;

    child.stdout.on('data', (data) => {
      stdout += data.toString();

      // Check if we need to respond
      if (interactionIndex < interactions.length) {
        const { expect, respond } = interactions[interactionIndex];
        if (stdout.includes(expect)) {
          child.stdin.write(respond + '\n');
          interactionIndex++;
        }
      }
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({ stdout, stderr, code });
    });

    child.on('error', reject);
  });
}

describe('Interactive CLI', () => {
  it('completes setup wizard', async () => {
    const result = await runInteractiveCLI('mycli', ['setup'], [
      { expect: 'Enter your name:', respond: 'Test User' },
      { expect: 'Enter your email:', respond: 'test@example.com' },
      { expect: 'Confirm? [y/N]', respond: 'y' }
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('Setup complete');
  });
});
```

## Testing CLI Output Formats

### Testing JSON Output

```python
import json

class TestJSONOutput:
    """Test JSON output format."""

    def test_json_output_flag(self):
        """Test --json flag produces valid JSON."""
        result = subprocess.run(
            ['mycli', 'list', '--json'],
            capture_output=True,
            text=True
        )

        assert result.returncode == 0

        # Verify valid JSON
        data = json.loads(result.stdout)
        assert isinstance(data, list)

    def test_json_structure(self):
        """Test JSON output structure."""
        result = subprocess.run(
            ['mycli', 'show', 'item-123', '--json'],
            capture_output=True,
            text=True
        )

        data = json.loads(result.stdout)

        # Verify expected fields
        assert 'id' in data
        assert 'name' in data
        assert 'created_at' in data

    def test_json_error_format(self):
        """Test error responses in JSON format."""
        result = subprocess.run(
            ['mycli', 'show', 'nonexistent', '--json'],
            capture_output=True,
            text=True
        )

        # Even errors should be valid JSON
        data = json.loads(result.stderr or result.stdout)
        assert 'error' in data
        assert 'message' in data
```

### Testing Table Output

```python
class TestTableOutput:
    """Test table-formatted output."""

    def test_table_headers(self):
        """Test table has headers."""
        result = subprocess.run(
            ['mycli', 'list'],
            capture_output=True,
            text=True
        )

        lines = result.stdout.strip().split('\n')
        header = lines[0]

        assert 'ID' in header
        assert 'NAME' in header
        assert 'STATUS' in header

    def test_table_alignment(self):
        """Test table columns are aligned."""
        result = subprocess.run(
            ['mycli', 'list'],
            capture_output=True,
            text=True
        )

        lines = result.stdout.strip().split('\n')

        # Find column positions from header
        header = lines[0]
        id_pos = header.index('ID')
        name_pos = header.index('NAME')

        # Verify data rows align with headers
        for line in lines[2:]:  # Skip header and separator
            # Each column should start at the same position
            assert len(line) >= name_pos
```

## Testing File System Operations

```python
import tempfile
import shutil
from pathlib import Path

class TestFileOperations:
    """Test CLI file system operations."""

    @pytest.fixture
    def temp_dir(self):
        """Create temporary directory for tests."""
        dir_path = tempfile.mkdtemp()
        yield Path(dir_path)
        shutil.rmtree(dir_path)

    def test_creates_output_file(self, temp_dir):
        """Test command creates output file."""
        output_file = temp_dir / 'output.txt'

        result = subprocess.run(
            ['mycli', 'generate', '--output', str(output_file)],
            capture_output=True
        )

        assert result.returncode == 0
        assert output_file.exists()
        assert output_file.read_text().strip() != ''

    def test_respects_existing_file(self, temp_dir):
        """Test doesn't overwrite without --force."""
        output_file = temp_dir / 'existing.txt'
        output_file.write_text('original content')

        result = subprocess.run(
            ['mycli', 'generate', '--output', str(output_file)],
            capture_output=True,
            text=True
        )

        assert result.returncode != 0
        assert 'already exists' in result.stderr
        assert output_file.read_text() == 'original content'

    def test_force_overwrite(self, temp_dir):
        """Test --force overwrites existing file."""
        output_file = temp_dir / 'existing.txt'
        output_file.write_text('original content')

        result = subprocess.run(
            ['mycli', 'generate', '--output', str(output_file), '--force'],
            capture_output=True
        )

        assert result.returncode == 0
        assert output_file.read_text() != 'original content'

    def test_creates_directories(self, temp_dir):
        """Test creates parent directories."""
        output_file = temp_dir / 'subdir' / 'nested' / 'output.txt'

        result = subprocess.run(
            ['mycli', 'generate', '--output', str(output_file)],
            capture_output=True
        )

        assert result.returncode == 0
        assert output_file.exists()
```

## Testing Pipes and Streams

```python
class TestPipesAndStreams:
    """Test CLI pipe and stream handling."""

    def test_stdin_pipe(self):
        """Test reading from stdin pipe."""
        result = subprocess.run(
            ['mycli', 'process', '-'],
            input='line1\nline2\nline3\n',
            capture_output=True,
            text=True
        )

        assert result.returncode == 0
        assert '3 lines processed' in result.stdout

    def test_pipe_to_another_command(self):
        """Test piping output to another command."""
        # mycli list | grep "active"
        list_proc = subprocess.Popen(
            ['mycli', 'list'],
            stdout=subprocess.PIPE
        )
        grep_proc = subprocess.Popen(
            ['grep', 'active'],
            stdin=list_proc.stdout,
            stdout=subprocess.PIPE,
            text=True
        )

        output, _ = grep_proc.communicate()
        list_proc.wait()

        assert 'active' in output

    def test_large_input_handling(self):
        """Test handling large input without memory issues."""
        # Generate large input
        large_input = 'x' * (10 * 1024 * 1024)  # 10MB

        result = subprocess.run(
            ['mycli', 'process', '-'],
            input=large_input,
            capture_output=True,
            text=True,
            timeout=30
        )

        assert result.returncode == 0
```

## Best Practices

### CLI Testing Checklist

```markdown
## CLI Testing Checklist

### Basic Functionality
- [ ] --help displays usage information
- [ ] --version shows version number
- [ ] All documented commands work
- [ ] Required arguments are enforced
- [ ] Optional arguments have defaults

### Input Handling
- [ ] Valid inputs produce expected output
- [ ] Invalid inputs show helpful errors
- [ ] Environment variables are respected
- [ ] Config files are loaded correctly
- [ ] stdin input works

### Output
- [ ] stdout contains expected output
- [ ] stderr contains errors only
- [ ] Exit codes are correct
- [ ] --quiet suppresses output
- [ ] --verbose adds detail
- [ ] --json produces valid JSON

### Error Handling
- [ ] Missing files show clear errors
- [ ] Permission errors are handled
- [ ] Network errors are handled
- [ ] Invalid config shows errors
- [ ] Interrupted operations clean up

### Integration
- [ ] File operations work correctly
- [ ] Pipe input/output works
- [ ] Works with other commands
- [ ] Signal handling (Ctrl+C)
```

## Conclusion

CLI testing ensures command-line applications work correctly across various input scenarios, output formats, and integration patterns. Comprehensive CLI tests verify argument parsing, output formatting, error handling, and system interactions.

## Key Takeaways

1. Test all argument combinations and flags
2. Verify exit codes for success and various error types
3. Test interactive prompts with tools like pexpect
4. Validate output formats (text, JSON, tables)
5. Test file system operations with temporary directories
6. Verify pipe and stream handling
7. Test environment variable integration
