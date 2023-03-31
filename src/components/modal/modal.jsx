import React from "react"
import ReactDOM from "react-dom"
import closeIco from "../../image/Close.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"
import IngredientsDetails from "../ingredient-details/ingredient-details";
class Modal extends React.Component {


  state = {
    data: {}
}

componentWillMount(){
    this.root = document.createElement('div');
    document.body.appendChild(this.root)
    this.setState({data:this.props.data})

}

componentWillUnmount(){
    document.body.removeChild(this.root)
  
}


    render(){
            return ( 
           
      ReactDOM.createPortal(
        <ModalOverlay  onClose={this.props.closeModal}>
        <div  onClick={(e)=>e.stopPropagation()} className={styles.modal}>
        <section className={styles['modal__heading']}>
        <h2 className="text text_type_main-large mt-10 ml-10">{this.props.children}</h2>
        <img onClick={this.props.closeModal} src={closeIco} alt={"Закрыть"} className={styles['modal__close-ico']}/>
        </section >
        <IngredientsDetails data={this.state.data}/>
         </div>
        </ModalOverlay>, this.root))
       
       
    }
}



export default Modal