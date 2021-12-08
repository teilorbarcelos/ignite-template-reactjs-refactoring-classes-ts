import { FiPlusSquare } from 'react-icons/fi'

import { Container } from './styles'
import Logo from '../../assets/logo.svg'

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({ setModalOpen }: Props) {

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}