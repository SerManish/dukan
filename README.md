# Dukan : The Shopping App

Dukan is a shopping app with most of e-commerce functions such as browsing products without logging in. To use features such as add product to cart and manage orders, user has to log in with a account.
 The dataset of products used is a subset of complete dataset available at https://data.world/promptcloud/product-details-on-flipkart-com.

There are two type of users :-

    1. Admin 
        Admin has full control over the website, he can manage products,orders and design of the app. All these features are included in the admin module which is only accessible to admin accounts. He can't create new admin accounts(this right is reserved with the owner).
        
    2. Customer
        Customer has access to content of the site in read only mode but has write access to personell feature like cart and orders. He can browse and buy various items using cart. He can also cancel order using the orders module.

Deployed [link](https://app-dukan.web.app/)

## Contributers 
   [Manish Kumar Giri](https://pip.pypa.io/en/stable/)          
   [Shivam Yadav](https://github.com/shivy08)


## Technologies Used

for development
### FrontEnd 
    BootStrap 4
    Angular
### Backend
    Firebase - FireStore

for hosting
### Hosting 
    Firebase Hosting

## Development server

You would need Node js and Angular CLI 9.1.6  installed to run this project in development mode.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

