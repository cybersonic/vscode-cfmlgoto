# cfgoto README

This is an extension for CFML to easily navigate to the cfml component defintions and cfm templates

## Go To Definition

Open the templates of Components in the line of cursor.

For example if there is tag like below

	<cfinclude template="globals.cfm">

Pressing Ctrl+F1 will open the template **globals.cfm**

Win/Linux: `Ctrl+F1`; Mac: `Cmd+F1`

Similarly it works at following places

`component implements = 'MyProject.interface.Handler'`  will open MyProject/interface/Handler.cfc

`component extends = "components.xmlrpc.Service" auth = "none" {` will open components/xmlrpc/Service.cfc

`component extends = 'MixInBase' {` will open MixInBase.cfc

`var configuration = new components.configuration.Manager('API.crimson');` will open components\configuration\Manager.cfc

`var defaults = new DefaultValues();` will open DefaultValues.cfc


## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Known Issues

It works by parsing the entire line and not where the cursor position is.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of CFMl GoTo ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
