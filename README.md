# Recipe Collection App

A beautiful React application to display and manage your personal recipe collection.

## Features

✨ **Home Page**
- Recipe cards with cover images and titles
- Smooth hover animations with lift effect
- Auto-rotating images (5-second intervals) with fade transitions
- Visual indicators for multiple images
- Click cards to view full recipes

❤️ **Favorites System**
- Mark recipes as favorites
- Favorites stored locally in browser
- Star icon on both home page and recipe pages

📖 **Recipe Pages**
- Large recipe images with navigation arrows
- Auto-rotating images with manual controls
- Image counter showing current position
- Formatted recipe content
- Easy navigation back to home page

🎨 **Design**
- Modern gradient background
- Smooth animations and transitions
- Fully responsive design
- Beautiful card shadows and hover effects

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

## Project Structure

```
/testbed/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomePage.js       # Main landing page
│   │   ├── HomePage.css
│   │   ├── RecipeCard.js     # Individual recipe card
│   │   ├── RecipeCard.css
│   │   ├── RecipePage.js     # Recipe detail page
│   │   └── RecipePage.css
│   ├── data/
│   │   └── recipes.js        # Recipe data
│   ├── App.js                # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css
├── recipes/                  # Recipe text files
└── images/                   # Recipe images
```

## How It Works

### Data Structure
- Recipes are stored in `/testbed/recipes/` as `.txt` files
- Images are in `/testbed/images/` with numbered prefixes matching recipes
- Recipe data is compiled in `src/data/recipes.js`

### Favorites
- Favorites are stored in browser's localStorage
- Persists across sessions
- Can be toggled from home page cards or recipe detail pages

### Navigation
- Uses hash-based routing (no additional dependencies)
- Direct URL access to recipes via `#recipe/recipe-slug`
- Back button navigation

## Customization

### Adding New Recipes

1. Add recipe text file to `/testbed/recipes/` following naming convention:
   - `{id} - {recipe_name}.txt`

2. Add images to `/testbed/images/` following naming convention:
   - `{id} - {recipe_name}.jpg` (primary image)
   - `{id} - {recipe_name}_2.jpg` (additional images)
   - `{id} - {recipe_name}_3.jpg` (more images)

3. Update `src/data/recipes.js` with the new recipe data

### Styling

All styling is in CSS files:
- Global styles: `src/App.css`, `src/index.css`
- Component styles: Individual `.css` files in `src/components/`

Colors can be customized by editing gradient values in CSS files.

## Browser Support

Works in all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a personal project. Feel free to use and modify as needed.

