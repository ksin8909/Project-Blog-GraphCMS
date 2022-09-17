import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="container mx-auto lg:px-10 mb-8">
      <div className="border-t border-white border-opacity-50 w-full inline-block"></div>
      <Container>
        <div className="pt-8 pb-2 flex flex-col justify-center items-center text-white">
          <p className="text-white">Copyright © 2022 @ksin8909</p>
        </div>
      </Container>
    </footer>
  )
}
