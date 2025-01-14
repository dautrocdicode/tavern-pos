# Tavern POS

Tavern POS is a modern point-of-sale (POS) application built with Next.js and integrated with the Algorand blockchain. Specifically designed for bars and pubs, this application provides an advanced payment solution that allows customers to use Algorand cryptocurrency.

## Key Features

- Intuitive and user-friendly interface optimized for touch screens
- Diverse product catalog with images, detailed descriptions, and pricing
- Dynamic shopping cart with easy addition, removal, and quantity adjustment of products
- Seamless integration with Algorand wallet for secure and near-instant payments
- Full support for the Algorand Testnet for development and testing
- Real-time inventory management
- Sales reports and data analysis
- Support for multiple languages and currencies

## Getting Started

To set up and run Tavern POS on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/dautrocdicode/tavern-pos.git
   cd tavern-pos
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Project Structure

- `app/`: Contains the components and pages of the Next.js application
  - `layout.tsx`: The main layout of the application
  - `page.tsx`: The home page
  - `pos/`: The main page of the POS application
    - `page.tsx`: The main POS interface
  - `components/`: Reusable components
    - `BeerList.tsx`: Displays the list of beers
    - `Cart.tsx`: Manages the shopping cart
    - `WalletConnect.tsx`: Handles wallet connections
- `app/providers.tsx`: Configuration for WalletProvider and other providers
- `public/`: Static resources such as images and icons
- `styles/`: Global CSS and style modules
- `utils/`: Utility functions and helpers
- `types/`: TypeScript type definitions

## Technologies Used

- **Next.js**: Full-stack web development framework for React
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Statically typed superset of JavaScript
- **Tailwind CSS**: Convenient CSS framework for custom styling
- **Algorand SDK**: For interacting with the Algorand blockchain
- **@txnlab/use-wallet-react**: React hooks library for Algorand wallet integration
- **Jest** and **React Testing Library**: For unit testing and integration testing
- **ESLint** and **Prettier**: For ensuring code quality and consistency

Ensure to update tests as necessary and follow the project's coding style.

## License

This project is distributed under the MIT License. See the `LICENSE` file in the repository for more details.

## Contact

If you have any questions or suggestions, please open an issue on GitHub or contact us via email at support@tavernpos.com.

Thank you for your interest in Tavern POS!
