import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero
      onViewWork={() => console.log('View work clicked')}
      onDownloadResume={() => console.log('Download resume clicked')}
    />
  );
}
