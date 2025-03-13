# Getting Started

This guide provides essential information on connecting to the API for both development and production environments.

## API Endpoints

### Development Environment

- **URL:** `https://api-dev.tomasmartinez.xyz`
- **Branch:** Uses the **dev** branch which includes upcoming features.
 
??? info "Note"
    Might be less stable and is not as thoroughly tested.

### Production Environment

- **URL:** `https://api.tomasmartinez.xyz`
- **Usage:** Recommended for most use cases due to its stability.

## Endpoints Overview

### `/ping` Endpoint

The `/ping` endpoint is used to check the status of the API and to retrieve the latest version information.

#### Sample Response

```json title="response.json" linenums="1"
{
  "active": true,
  "version": "string"
}
```
