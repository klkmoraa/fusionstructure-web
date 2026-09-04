import './styles.css';
import { FusionLanding } from './features/welcome/FusionLanding';

const openProduct = (repository: string): void => {
  window.location.assign(`https://github.com/klkmoraa/${repository}`);
};

/** Portal-only composition: products are reached by links, never imports. */
const App = () => (
  <FusionLanding
    language="es"
    onOpenSolver2D={() => openProduct('fstructure')}
    onOpenSolver3D={() => openProduct('fusionstructure-space3d')}
    onOpenClassroom={() => openProduct('fstructure')}
  />
);

export default App;
