import { Suspense } from 'react'
import { YoutubeForm } from './components/youtube-form'
import { getYoutubeSection } from '@/app/services/youtube-service'

export default async function YoutubeAdminPage() {

  const youtubeSection = await getYoutubeSection()



  const handleUpdate = (youtubeSection: YoutubeSection) => {
    youtubeService.updateYoutube(youtubeSection)
  }
  

  return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Youtube Sections Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
          <YoutubeForm youtube={youtubeSection} handleUpdate={handleUpdate} />
          </Suspense>
        </div>
      </div>
  )
}
