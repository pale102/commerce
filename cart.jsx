//src/Cart/Cart.jsx
import { useSelector, useDispatch} from 'react-redux';
import {selectCartItems, selectCartTotal, clearCart} from '../../store/cartSlice';
import CartItem from '.:CartItem';

export default function Cart ({onCheckout}){
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    if (items.length === 0){
        return (<div className="flex flex-col items-center justify-center py-16 text)center">
            <p className="text-grey 500 text-lg mb-2">your cart is empty</p>
            <p className="text-grey 400 text-5m">Add something you like to get started</p>
        </div>);

    }
    return (<div className="max-w-2xl mx-auto p-'">
        <div>
            <h2 className="text-xl font-semibold text-grey-900">your cart is empty</h2>
            <button 
            onClick = {
                ()=> dispatch(clearCart())
            }
           className="text-sm text-grey-400 hover:text-red-500" >Clear cart
           </button>
           </div>
           <div>
            {
                items.map((item)=> (<CartItem key={item.productId}item={item}></>))
            }
           </div>
           <button
           onClick ={onCheckout}
           className = "w-full mt-6 bg-grey-900 text-white py-3 rounded-lg font-medium hover:bg-grey-800 transition-colors"
           >
            proceed to Checkout
           </button>
        </div>
        );
}