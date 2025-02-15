import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress';


export default function Analytics({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <h1>Progress Overview</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Task Completion</span>
          <span className="text-sm text-muted-foreground">{completionPercentage.toFixed(0)}%</span>
        </div>
        {/* <CircularProgress className="h-2" /> */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold">{completedTasks}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

