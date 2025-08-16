# blog.tomasmartinez.xyz

Check it out here https://blog.tomasmartinez.xyz

Made using Material for MkDocs

## To run

1. `.\venv\Scripts\activate`
2. `mkdocs serve`
3. `mkdocs build`

### If Error

Full reset of env, leaving here in case I forget.

1. `deactivate`
2. `pip install mkdocs-rss-plugin`
3. `rm -r .\venv`
4. `python -m venv ".\venv"`
5. `.\venv\Scripts\activate`
6. `python -m pip install --upgrade pip`
7. `pip install mkdocs mkdocs-material`
8. `pip install mkdocs-rss-plugin`
9. `mkdocs serve`
