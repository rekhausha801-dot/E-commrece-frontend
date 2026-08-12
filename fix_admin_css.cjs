const fs = require('fs');
const file = 'src/components/admin/AdminLayout.css';
let css = fs.readFileSync(file, 'utf8');

// prepend .admin-sidebar to .nav-item, .nav-group, .sub-nav, .sub-nav-item
css = css.replace(/\.nav-item/g, '.admin-sidebar .nav-item');
css = css.replace(/\.nav-group/g, '.admin-sidebar .nav-group');
css = css.replace(/\.sub-nav/g, '.admin-sidebar .sub-nav');

// also replace multiple spaces just in case
css = css.replace(/\.admin-sidebar \.admin-sidebar/g, '.admin-sidebar');

fs.writeFileSync(file, css);
console.log('Fixed AdminLayout.css');
