import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-moss-600">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink-900 sm:text-5xl">This page took a wrong turn.</h1>
      <p className="mt-4 max-w-md text-base text-ink-700">
        The page you're looking for isn't here. It may have moved, or the link may be out of date.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button as="link" to="/">
          Back to Home
        </Button>
        <Button as="link" to="/equipment" variant="outline">
          Browse Equipment
        </Button>
      </div>
      <Link to="/contact" className="mt-6 text-sm font-medium text-ink-700 underline underline-offset-4">
        Or contact our team
      </Link>
    </Container>
  );
}
