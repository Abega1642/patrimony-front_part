import { FaChartLine, FaMoneyBillWave, FaPlus, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Yε:rPatrimony</h1>
      <ul className="dashboard-menu">
        <li>
          <a href="#graph">
            <FaChartLine /> Graphs
          </a>
        </li>
        <li>
          <a href="#values">
            <FaMoneyBillWave /> Valeurs de Patrimoine
          </a>
        </li>
        <li>
          <Link to="/possession" className="dashboard-menu-item">
            <FaList className="dashboard-icon" /> Liste des possessions
          </Link>
        </li>
        <li>
          <Link to="/possession/create" className="dashboard-menu-item">
            <FaPlus className="dashboard-icon" /> Ajout de possession
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
