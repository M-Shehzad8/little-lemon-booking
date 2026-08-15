// Menu.jsx
// Menu section matching the Little Lemon mockup:
// "ORDER FOR DELIVERY!" heading, category filter chips, and a list
// of menu items each with a thumbnail image.
import { useState } from 'react';
import './Menu.css';

const CATEGORIES = ['Lunch', 'Mains', 'Desserts', 'A La Carte', 'Specials'];

const MENU_ITEMS = [
  {
    name: 'Greek Salad',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese, topped with our signature dressing.',
    price: '$12.99',
    image: '/images/Copped_Vegies.jpg',
  },
  {
    name: 'Bruschetta',
    description:
      'Our bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    price: '$7.99',
    image: '/images/Dish_Serving_1.jpg',
  },
  {
    name: 'Grilled Fish',
    description:
      'Our fresh catch of the day, grilled to perfection with lemon and herbs, served with seasonal vegetables.',
    price: '$18.99',
    image: '/images/Fish_on_Grill.jpg',
  },
  {
    name: 'Pasta Special',
    description:
      'House-made pasta tossed in a rich tomato and basil sauce, finished with parmesan and a drizzle of olive oil.',
    price: '$14.99',
    image: '/images/Pasta.jpg',
  },
  {
    name: 'Plated Dish',
    description:
      'A chef-curated plate featuring locally-sourced ingredients and daily specials from the Little Lemon kitchen.',
    price: '$16.99',
    image: '/images/Dish_Serving_2.jpg',
  },
];

export default function Menu() {
  const [active, setActive] = useState('Lunch');

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <h2 id="menu-title" className="menu__heading">
        Order for delivery!
      </h2>

      <div className="menu__filters" role="tablist" aria-label="Menu categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            className={
              'menu__chip' + (active === cat ? ' menu__chip--active' : '')
            }
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="menu__list">
        {MENU_ITEMS.map((item) => (
          <li className="menu__item" key={item.name}>
            <div className="menu__info">
              <div className="menu__row">
                <h3 className="menu__name">{item.name}</h3>
                <span className="menu__price">{item.price}</span>
              </div>
              <p className="menu__desc">{item.description}</p>
            </div>
            <img
              className="menu__img"
              src={item.image}
              alt={item.name}
              width="90"
              height="90"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
