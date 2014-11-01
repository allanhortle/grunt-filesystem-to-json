# grunt-files-to-json

Turns a folder of files into nested json data. Parsing any YAML front matter along the way.

## Example Config

```
filesystem_to_json: {
    sample_destination: {
        options: {},
        files: {
            'data.json': ['data/**/*']
        }
    }
},
```