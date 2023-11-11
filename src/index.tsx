/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import { AppRouter } from './config/router/Router';

const root = document.getElementById('root');

render(() => <AppRouter />, root!);
