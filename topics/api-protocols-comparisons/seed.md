# API protocols comparisons

| Feature         | gRPC                        | REST                         |
| --------------- | --------------------------- | ---------------------------- |
| Data Format     | Binary (Protobuf)           | Text (JSON/XML)              |
| Contract        | Strict (.proto file)        | Optional (OpenAPI/Swagger)   |
| Performance     | Extremely High              | Moderate                     |
| Browser Support | Requires a proxy (gRPC-Web) | Native                       |
| Streaming       | Native Bidirectional        | Limited (Server-Sent Events) |
