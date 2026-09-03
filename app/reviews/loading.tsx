import Card from '@/components/cards/Card'

export default function ReviewsLoading() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} variant="standard" className="animate-pulse">
            <div className="h-6 bg-border-light rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-border-light rounded w-full mb-2"></div>
            <div className="h-4 bg-border-light rounded w-5/6"></div>
          </Card>
        ))}
      </div>
    </div>
  )
}

