# blog.tomasmartinez.xyz

Check it out here https://blog.tomasmartinez.xyz

Made using Material for MkDocs

## To run

1. `.\venv\Scripts\activate` or `source venv/bin/activate`
2. `mkdocs serve`
3. `mkdocs build`

### If Error

Full reset of env, leaving here in case I forget.

1. `deactivate`
2. `rm -r .\venv`
3. `python -m venv ".\venv"`
4. `.\venv\Scripts\activate` or `source venv/bin/activate`
5. `python3 -m pip install --upgrade pip`
6. `python3 -m pip install mkdocs mkdocs-material`
7. `python3 -m pip install mkdocs-rss-plugin`
8. `mkdocs serve`
