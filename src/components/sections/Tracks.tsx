import { useState } from 'react'
import { SectionShell } from '../layout/SectionShell'
import { TrackCard } from './TrackCard'
import { TrackModal } from '../ui/TrackModal'
import { TRACKS } from '../../data/tracks'
import type { Track } from '../../types'

const STAGGER_COLS = 3

export function Tracks() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  return (
    <>
      <SectionShell
        id="tracks"
        index={2}
        eyebrow="PROBLEM DOMAINS"
        heading="6 High-Impact Hackathon Tracks"
        gradientWords={['Hackathon', 'Tracks']}
        deck="Choose your battleground. From Autonomous AI and Zero-Knowledge security to Smart Campus automation, each track offers curated problem statements and dedicated prizes."
        band="base"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((track, i) => {
            const delay = (Math.floor(i / STAGGER_COLS) + (i % STAGGER_COLS)) * 0.06
            return (
              <TrackCard
                key={track.id}
                track={track}
                delay={delay}
                onSelect={(t) => setSelectedTrack(t)}
              />
            )
          })}
        </div>
      </SectionShell>

      <TrackModal
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
      />
    </>
  )
}
