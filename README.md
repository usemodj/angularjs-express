## Install yoeman : yoeman.io

$ sudo npm install -g yo

// Install angular generator
$ sudo npm install -g generator-angular 

$ mkdir angularjs-express
$ cd angularjs-express

$ yo angular

----------------
generator-angular: task “karma” not found when calling `grunt test`

$ npm install grunt-karma --save-dev

grunt serve: Grunt watch error - Waiting…Fatal error: watch ENOSPC

$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

----------------
Grunt build Error

Running "useminPrepare:html" (useminPrepare) task
Going through public/index.html to update the config
Looking for build script HTML comment blocks
Warning: An error occurred while processing a template (Cannot read property 'options' of undefined). Use --force to continue.


Had this very issue this morning and fixed it by hand by modifying line 166 in ./grunt-usemin/tasks/usemin.js

The problem was that usemin was trying to access grunt -config by calling a method instead of a variable. This is what the line says when pulled freshly out of the repository:

config = c.process(filepath, grunt.config());

FIX:
change the line to

config = c.process(filepath, grunt.config);

-----------------------------
## Grunt build

$ grunt 

$ grunt build

## Run Express.js server

$ NODE_ENV=production  node app.js

## Browser connect 

http://localhost:3000