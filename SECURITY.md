# Security Policy

## Supported Versions

Only the current major version is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within WARNING ENGINE, please send an e-mail to security@e-os.org (or the designated maintainer email). All security vulnerabilities will be promptly addressed.

Please do not report security vulnerabilities through public GitHub issues.

### Scope

Since WARNING ENGINE is designed as a stateless analytical core and does not connect to networks, file systems, or databases, the scope for vulnerabilities is primarily related to:
- Input parsing (e.g., Denial of Service through massively nested objects or prototype pollution).
- Data contract evasion.
- Memory leaks via pure function evaluation.

We take these issues seriously as the engine acts as an evaluation authority.
