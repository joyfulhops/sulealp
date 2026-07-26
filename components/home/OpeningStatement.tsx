import { SignatureMark } from "@/components/brand/BrandMark";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { openingManifesto } from "@/data/manifesto";

export default function OpeningStatement() {
  const [lead, ...rest] = openingManifesto.paragraphs;

  return (
    <section className="opening-statement bg-ivory" aria-label="Şule Alp yazısı">
      <Container className="opening-statement-inner">
        <Reveal>
          <div className="opening-statement-body">
            <p className="opening-statement-lead">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <footer className="opening-statement-sign">
            <SignatureMark className="opening-statement-signature" />
            <p className="opening-statement-name">{openingManifesto.signOff}</p>
          </footer>
        </Reveal>
      </Container>
    </section>
  );
}
