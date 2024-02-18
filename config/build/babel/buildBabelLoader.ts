import {BuildOptions} from "../types/types";
import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {

    const plugins = []

    if(options.mode === 'production'){
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    }
    else {
        plugins.push(
            "@babel/plugin-transform-typescript",
            [
                "@babel/plugin-transform-react-jsx",
                {
                "runtime": "automatic"
                }
            ]
        )
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "useBuiltIns": "entry",
                            "corejs": "3.22"
                        }
                    ],
                    "@babel/preset-typescript",
                    ["@babel/preset-react", {"runtime": "automatic"}]
                ],

                "plugins": [
                    "@babel/plugin-transform-typescript",
                    ["@babel/plugin-transform-react-jsx", {
                        "runtime": "automatic"
                    }],
                    [
                        removeDataTestIdBabelPlugin,
                        {
                            props: ['data-testid']
                        }
                    ]
                ]
            }
        },

    }
}
