export = {
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-typescript',
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
