import { FiEdit3, FiTrash } from 'react-icons/fi'

import { Container } from './styles'
import { FoodProps } from '../../contexts/FoodsContext'
import { useFoods } from '../../hooks/useFoods'

interface Props {
  food: FoodProps
  setEditModalOpen: () => Promise<void>
}

export function Food({ food, setEditModalOpen }: Props) {
  const {
    handleDeleteFood,
    toggleAvailable,
    setEditingFood
  } = useFoods()

  async function editFood(food: FoodProps) {
    setEditingFood(food)
    setEditModalOpen()
  }

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => editFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={() => toggleAvailable(food)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  )
}