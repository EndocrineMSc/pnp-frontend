# RPG Adventure Journal

## Overview

A somewhat bigger learning project (still in development). The web app will be used as a note-taking app with limited wiki-like functionality for table-top roleplaying games (inspiration: Kanka). So far only made for desktop PCs.

## Built With

The frontend is done in React + Vite, the backend is a REST-API that I programmed with Express/Node.js. The database I used is MongoDB (Mongoose). Other mentionable technologies for this project so far include Tailwind CSS, Quill (text editor), and Cloudinary (image-storage).

## Features

### Current Features

- Take notes with a WYSIWYG editor (Quill editor)
- Create entries for campaigns, locations, characters and objects
- Customize entries with your own images (via Cloudinary, note: deleting entries or replacing images will automatically delete the previous image from Cloudinary, I will not use any of the images outside this project)
- User authorization and data storage via backend REST-API: https://github.com/EndocrineMSc/pnp-backend

### Planned Features

- UI/UX rework
- Linking of entries in notes
- Entry Links will display their short description as tooltip on mouse hover over link
