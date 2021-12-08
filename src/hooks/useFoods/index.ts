import { useContext } from "react"
import { FoodsContext } from "../../contexts/FoodsContext"

export function useFoods() {
  const context = useContext(FoodsContext)
  return context
}