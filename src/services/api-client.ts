import * as productsService from './product-service';
import * as ingredientsService from './ingredients-service';
import * as cartService from './cart-service';
import * as authService from './auth-service';

export const apiClient = {
  productsService,
  ingredientsService,
  cartService,
  authService
};