# dev_sysinfo

During development of any application, there comes a time that we encounter issues on our system that got us stuck.
These may be environment variables, version mismatch and others, we usually need to include our system information and provide it to the discourse websites and forums like stackoverflow.

This will collect development system information and common technology information like `nodejs --version` and `python --version` via terminal commands.

## Installation

`npm install -g dev_sysinfo`

Installation directory:
Windows: `%USERPROFILE%\AppData\Roaming\npm\node_modules\dev_sysinfo`
Unix: `/usr/local/lib/node/dev_sysinfo` or `/usr/local/lib/node_modules/dev_sysinfo`

## Running

Run the package like this: `dev_sysinfo`.
After running, this will open the output folder that contains a `.txt` and `.json` file that contains your system information.

## Configuration

### settings.json

`$INSTALLATION_DIR/lib/settings.json` contains commands for each platform to get system information needed.

For `$INSTALLATION_DIR` kindly refer under Installation section.

```
{
    "description": "Keys are based from process.platform values. See https://nodejs.org/api/process.html#process_process_platform.",
    "outputs": {
        "outputDir": "dev_sysinfo_outputs/",
        "outputName": "dev_sysinfo",
        "text": true,
        "json": true
    },
    "win32":{
        "processor":[
            "cmd /C echo %PROCESSOR_ARCHITECTURE%",
            "cmd /C echo %NUMBER_OF_PROCESSORS%"
        ],
        "path":[
            "cmd /C echo %path%"
        ],
        "nodejs": [
            "node --version",
            "nvm list"
        ],
        "python":[
            "python --version",
            "pip freeze"
        ],
        "choco":[
            "cmd /C echo %ChocolateyInstall%"
        ],
        "android":[
            "cmd /C echo %ANDROID_SDK_ROOT%",
            "cmd /C echo %GRADLE_USER_HOME%"
        ],
        "java":[
            "cmd /C echo %JAVA_HOME%"
        ]
    },
    "aix":{},
    "sunos":{},
    "openbsd":{},
    "linux":{},
    "freebsd":{},
    "darwin":{}
}
```

**Updating this and adding commands for each platform is very much appreciated.**

## Outputs

This will output a `.txt` and `.json` file and will open the output directory after run.

`dev_sysinfo.txt` sample output:

```
...
node --version
	v16.13.2

cmd /C echo %PROCESSOR_ARCHITECTURE%
	AMD64

pip freeze
	cachetools==5.2.0
	future==0.18.2
	pefile==2022.5.30
	py2exe==0.13.0.0
	pynput==1.7.6
	six==1.16.0
...
```

`dev_sysinfo.json` sample output:

```
...
{
    "node --version": "v16.13.2\r\n\t",
    "cmd /C echo %PROCESSOR_ARCHITECTURE%": "AMD64\r\n\t",
    "pip freeze": "cachetools==5.2.0\r\n\tfuture==0.18.2\r\n\tpefile==2022.5.30\r\n\tpy2exe==0.13.0.0\r\n\tpynput==1.7.6\r\n\tsix==1.16.0\r\n\t"
}
...
```

**Remove useless information. If you are asking about `python` remove information about `nodejs`.**