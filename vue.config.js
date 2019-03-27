module.exports = {
    pages: {
      index: {
        // entry for the page
        entry: 'src/pages/home/main.js',
        // the source template
        template: 'public/index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Index Page',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      'about': {
        // entry for the page
        entry: 'src/pages/about/main.js',
        // the source template
        template: 'public/index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'About',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'about']
      },
      'explore': {
        // entry for the page
        entry: 'src/pages/explore/main.js',
        // the source template
        template: 'public/index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'About',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'explore']
      },
      'my_cv': {
        // entry for the page
        entry: 'src/pages/cv/main.js',
        // the source template
        template: 'public/index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'My Curriculum',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'my_cv']
      },
      'login': {
        // entry for the page
        entry: 'src/pages/login/main.js',
        // the source template
        template: 'public/index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Log in',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'login']
      },
      'apply': {
        // entry for the page
        entry: 'src/pages/apply/main.js',
        // the source template
        template: 'public/index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Apply',
        // chunks to include on this page, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'apply']
      }
    }
  }
