import { PossessionsList } from "../PossessionsList/PossessionList"
import AddPossessionSection from "../addPossessionSection/AddPossessionSection"
import Welcome from "../welcomeSection/Welcome"

export default function PossessionPage() {
    return (
        <main className="main">
                <Welcome />
                <PossessionsList />
                <AddPossessionSection />
        </main>
    )
}