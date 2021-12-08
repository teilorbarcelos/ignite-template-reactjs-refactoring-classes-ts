import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../services/api";

export interface FoodProps {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image: string
}

type FoodsProviderProps = {
  children: ReactNode
}

type FoodsContextProps = {
  foods: FoodProps[]
  handleAddFood: (food: FoodProps) => Promise<void>
  handleUpdateFood: (food: FoodProps) => Promise<void>
  handleDeleteFood: (id: number) => Promise<void>
  toggleAvailable: (food: FoodProps) => Promise<void>
  editingFood: FoodProps
  setEditingFood: React.Dispatch<React.SetStateAction<FoodProps>>
}

export const FoodsContext = createContext<FoodsContextProps>({} as FoodsContextProps)

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps)

  async function updateFoods() {
    api.get<FoodProps[]>('/foods')
      .then(response => setFoods(response.data))
  }

  async function handleAddFood(food: FoodProps) {
    try {
      const response = await api.post<FoodProps>('/foods', {
        ...food,
        available: true,
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: FoodProps) {
    try {
      await api.put(
        `/foods/${food.id}`, food)

      updateFoods()
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    const deletedFood = await api.delete<FoodProps>(`/foods/${id}`)

    if (!deletedFood) {
      return
    }

    setFoods(foods.filter(food => food.id !== id))
  }

  async function toggleAvailable({
    id,
    available,
    description,
    image,
    name,
    price
  }: FoodProps) {
    await api.put(`/foods/${id}`, {
      id,
      available: !available,
      description,
      image,
      name,
      price
    })

    updateFoods()
  }

  useEffect(() => {
    updateFoods()
  }, [])

  return (
    <FoodsContext.Provider value={{
      foods,
      handleAddFood,
      handleUpdateFood,
      handleDeleteFood,
      toggleAvailable,
      editingFood,
      setEditingFood
    }}>
      {children}
    </FoodsContext.Provider>
  )
}