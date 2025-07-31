import { Ingredient, Specialty } from '../types';

export const ingredients: Ingredient[] = [
  { id: 'pepperoni', name: 'Peperoni', icon: '🍕' },
  { id: 'jamon', name: 'Jamón', icon: '🍖' },
  { id: 'salami', name: 'Salami', icon: '🥩' },
  { id: 'salchicha', name: 'Salchicha', icon: '🌭' },
  { id: 'chorizo', name: 'Chorizo', icon: '🌶️' },
  { id: 'camaron', name: 'Camarón', icon: '🦐', isDouble: true },
  { id: 'atun', name: 'Atún', icon: '🐟' },
  { id: 'pina', name: 'Piña', icon: '🍍' },
  { id: 'champinon', name: 'Champiñón', icon: '🍄' },
  { id: 'cebolla', name: 'Cebolla', icon: '🧅' },
  { id: 'morron', name: 'Morrón', icon: '🌶️' },
  { id: 'jalapeno', name: 'Jalapeño', icon: '🌶️' },
  { id: 'aceituna', name: 'Aceituna', icon: '🟢' },
  { id: 'albahaca', name: 'Albahaca', icon: '🌿' },
  { id: 'aceite-oliva', name: 'Aceite de Oliva', icon: '🍾' },
];

export const specialties: Specialty[] = [
  {
    id: 'hawaiana',
    name: 'Hawaiana',
    price: 150,
    description: 'Jamón y Piña',
    ingredients: ['Jamón', 'Piña'],
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'meat',
    name: 'Meat',
    price: 150,
    description: 'Peperoni y Salami',
    ingredients: ['Peperoni', 'Salami'],
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'alemana',
    name: 'Alemana',
    price: 150,
    description: 'Salchicha y Champiñón',
    ingredients: ['Salchicha', 'Champiñón'],
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'margarita',
    name: 'Margarita',
    price: 150,
    description: 'Albahaca y Aceite de Oliva',
    ingredients: ['Albahaca', 'Aceite de Oliva'],
    image: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'americana',
    name: 'Americana',
    price: 180,
    description: 'Champiñón, Piña y Jamón',
    ingredients: ['Champiñón', 'Piña', 'Jamón'],
    image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'vegetariana',
    name: 'Vegetariana',
    price: 180,
    description: 'Champiñón, Piña y Morrón',
    ingredients: ['Champiñón', 'Piña', 'Morrón'],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'italiana',
    name: 'Italiana',
    price: 180,
    description: 'Champiñón, Jamón, Salami y Camarón',
    ingredients: ['Champiñón', 'Jamón', 'Salami', 'Camarón'],
    image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'mexicana',
    name: 'Mexicana',
    price: 180,
    description: 'Chorizo, Cebolla, Morrón y Jalapeño',
    ingredients: ['Chorizo', 'Cebolla', 'Morrón', 'Jalapeño'],
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'marinera',
    name: 'Marinera',
    price: 180,
    description: 'Camarón, Atún, Cebolla y Aceituna',
    ingredients: ['Camarón', 'Atún', 'Cebolla', 'Aceituna'],
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'carnes-frias',
    name: 'Carnes Frías',
    price: 180,
    description: 'Jamón, Peperoni, Salami y Salchicha',
    ingredients: ['Jamón', 'Peperoni', 'Salami', 'Salchicha'],
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'cuatro-estaciones',
    name: 'Cuatro Estaciones',
    price: 210,
    description: 'Combinación de Margarita, Hawaiana, Vegetariana y Meat',
    ingredients: ['Albahaca', 'Jamón', 'Piña', 'Champiñón', 'Morrón', 'Peperoni', 'Salami'],
    image: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'boneless-pizza',
    name: 'Pizza Boneless',
    price: 180,
    description: 'Pizza con boneless crujientes - Elige tu sabor favorito',
    ingredients: ['Boneless', 'Queso mozzarella', 'Salsa especial'],
    image: '/Captura copy.PNG',
    isBoneless: true,
    bonelessFlavors: [
      { id: 'bufalo', name: 'Búfalo', description: 'Picante clásico' },
      { id: 'bbq', name: 'BBQ', description: 'Dulce ahumado' },
      { id: 'habanero', name: 'Habanero', description: 'Extra picante' }
    ]
  }
];

export const bonelessFlavors = [
  { id: 'bufalo', name: 'Búfalo', icon: '🔥' },
  { id: 'bbq', name: 'BBQ', icon: '🍖' },
  { id: 'habanero', name: 'Habanero', icon: '🌶️' }
];

export const snacks = [
  {
    id: 'boneless',
    name: 'Boneless',
    price: 100,
    description: 'Alitas deshuesadas crujientes con aderezo ranch',
    unit: 'orden',
    image: '/Captura copy copy.PNG',
    flavors: bonelessFlavors
  },
  {
    id: 'papas-francesas',
    name: 'Papas a la Francesa',
    price: 40,
    description: 'Papas doradas y crujientes',
    unit: '250gr',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];