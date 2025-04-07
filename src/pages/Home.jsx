import React from 'react';
import { Presentation } from '../components/home/Presentation';
import { Characteristics } from '../components/home/Characteristics';
import { About } from '../components/home/About'
import { Contact } from '../components/home/Contact'

export const Home = () => {

  return (
  <>
    <div id='presentation'>
      <Presentation/>
    </div>

    <div id='characteristics'>
      <Characteristics/>
    </div>

    <div id='about'>
      <About/>
    </div>

    <div id='contact'>
      <Contact/>
    </div>
  </>
  )
}





