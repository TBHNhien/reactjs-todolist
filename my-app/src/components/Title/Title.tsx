import React from 'react'
import styles from './title.module.scss'

type TitleProps = {
  address: {
    street: string
  }
}

function Title(props: TitleProps) {
  console.log(props.address)
  return <h1 className={styles.title}>To do list typescript</h1>
}

function equal(prevProp: TitleProps, nextProps: TitleProps) {
  // khi func return true thì prop trước và sau giống nhau
  //=>không làm cho title rerender
  //ngược lại return true thì prop trước và sau khác nhau
  return prevProp.address.street === nextProps.address.street
}

export default React.memo(Title) //ngoai tham số đầu tiên là component
//tham số thứ 2 đó là 1 function xem nó có rerender không
