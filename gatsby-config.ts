export = {
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages/`,
            },
        },
        'gatsby-plugin-mdx',
        {
            resolve: 'gatsby-plugin-layout',
            options: {
                component: require.resolve('./src/components/Layout/index.tsx'),
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: '0xABCDEF',
                short_name: '0xABCDEF',
                background_color: '#000',
                theme_color: '#abcdef',
                icon: 'src/images/profile.png',
            },
        },
    ],
};
