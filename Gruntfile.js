module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
	
	bower: grunt.file.readJSON('./.bowerrc'),

    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: [
          'src/_intro.js',
          'src/main.js',
          'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },
	
	copy: {
	  dest: 'dist/libs',
      dist: {
       files: [{
         expand: true,
         cwd: '<%= bower.directory %>/jquery/dist',
         src: 'jquery.min.js',
         dest: '<%= copy.dest %>'
       },
       {
         expand: true,
         cwd: '<%= bower.directory %>/underscore',
         src: 'underscore-min.js',
         dest: '<%= copy.dest %>',
		 rename: function(dest, src) {
			return dest + '/' + src.replace('-','.');
		}
       }
	   ]
      }
    },
	
    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>'],
		  '<%= copy.dest %>/backbone.all.min.js': [ '<%= bower.directory %>/backbone/backbone.js',  '<%= bower.directory %>/backbone-relational/backbone-relational.js' ],
        }
      }
    },

    qunit: {
      files: ['test/*.html']
    },

    jshint: {
      files: ['dist/backstorage.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'jshint', 'qunit']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['copy', 'concat', 'jshint', 'qunit', 'uglify']);

};
