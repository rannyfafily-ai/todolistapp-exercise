import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600">
            <Card className="max-w-2xl w-full shadow-2xl border border-white/10 bg-background/95 backdrop-blur">
                <CardContent className="p-10 space-y-8 text-center">
                    <div className="inline-flex items-center rounded-full 
            bg-purple-100 text-purple-700 
            dark:bg-purple-500/10 dark:text-purple-300
            px-4 py-1 text-sm font-medium">
                        Productivity Tool
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Get things done <br />
                        <span className="text-purple-600 dark:text-purple-400">
                            Effortlessly
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                         Stay on top of your day and turn your plans into progress with our simple, beautifully designed todo app

                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => navigate("/todos")}
                        >
                            Try Now
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-purple-200 text-purple-700 
                hover:bg-purple-50 hover:text-purple-800
                dark:border-purple-500/30 dark:text-purple-300"
                            onClick={() => navigate("/todos")}
                        >
                            View Todos
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Built with React, Tailwind CSS, and shadcn/ui
                    </p>

                </CardContent>
            </Card>
        </div>
    )
}