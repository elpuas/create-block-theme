#! /usr/bin/env node
const chalk    = require('chalk');
const prompts  = require('prompts');
const format  = /^[a-zA-Z\d-]+$/gm;


(async () => {
    const questions = [
        {
            type: 'text',
            name: 'value',
            message: 'What is the name of your theme?',
            validate: ( value ) => {
                value.match(format) ? true : 'Only letters, and hyphens are allowed.'
            }
        },
        {
            type: 'text',
            name: 'description',
            message: 'What is the description of your theme?',
            validate: ( value ) => {
                value.length > 0 ? true : 'Please enter a description.'
            }
        }
    ];
    const onSubmit = (prompt, answer) => console.log(`{bold.cyan ${prompt.message}}: ${answer}`); // eslint-disable-line no-console
    const response = await prompts(questions, { onSubmit }); // eslint-disable-line no-console
    console.log(response);
})();
