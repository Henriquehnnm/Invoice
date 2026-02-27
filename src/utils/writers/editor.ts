import db from "../../data/database"

export function updaterCompleted(id: number, completed: boolean): void {
    const query = db.prepare(`
        UPDATE projects
        set projectCompleted = $completed
        WHERE id = $id
    `)

    query.run({
        $id: id,
        $completed: completed ? 1 : 0
    })
}

export function updaterStarted(id: number, started: boolean): void {
    const query = db.prepare(`
        UPDATE projects
        set projectStarted = $started
        WHERE id = $id
    `)

    query.run({
        $id: id,
        $started: started ? 1 : 0
    })
}