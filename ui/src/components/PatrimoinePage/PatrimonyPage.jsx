import Dashboard from "../UnchangedComponents/Dashboard"
import LineChart from "../Chart/LineChart"
import PatrimonyValue from "../PatrimonyValue/PatrimonyValue"

export default function PatrimonyPage() {
    return (
        <main className="main">
            <Dashboard />
            <section className="ptr-section">
                <div id="graph">
                    <LineChart />
                </div>
                <div id="values">
                    <PatrimonyValue />
                </div>
            </section>
        </main>
    )
}