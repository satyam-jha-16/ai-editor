
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "@/components/Navbar";
import { Cover } from "@/components/ui/cover";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-neutral-900">

        <BackgroundBeams />
        <div className="h-[40rem] w-full bg-neutral-950 relative flex flex-col items-center justify-center overflow-hidden rounded-md">
          <div className="w-full absolute inset-0 h-screen">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          <h1 className="md:text-6xl text-4xl lg:text-7xl font-bold text-center text-white relative z-20">
            AI-Powered Photo & Video Editor
          </h1>
          <div className="mt-4 relative z-20">
            <TextGenerateEffect words="Transform your media with cutting-edge AI technology" />
          </div>
        </div>

        <MaxWidthWrapper className="mt-20 sm:mt-30 mb-12 flex flex-col items-center justify-center text-center">
          <div className="mx-auto mb-10 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">
              AI Editor is now public!
            </p>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            Edit your <span className="text-blue-600">photos and videos</span> <Cover>with AI</Cover>
          </h1>
          <p className="mt-5 max-w-prose text-zinc-400 sm:text-lg">
            AI Editor allows you to enhance, transform, and create stunning visuals with the power of artificial intelligence.
          </p>

          <Button className="mt-5 ">
            <Link

              href="/dashboard"
              target="_blank"
            >
              <span className="flex items-center ">Get started<ArrowRight className="ml-2 h-5 w-5" /> </span>
            </Link>

          </Button>
        </MaxWidthWrapper>

        <div>
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>

            <div>
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                      src="/dashboard-preview.png"
                      alt="product preview"
                      width={1364}
                      height={866}
                      quality={100}
                      className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-200 sm:text-5xl">
                Start editing in minutes
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Editing your photos and videos has never been easier than with our AI-powered platform.
              </p>
            </div>
          </div>

          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">Step 1</span>
                <span className="text-xl font-semibold">Upload your media</span>
                <span className="mt-2 text-zinc-700">
                  Choose the photo or video you want to edit and upload it to our platform.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">Step 2</span>
                <span className="text-xl font-semibold">Apply AI edits</span>
                <span className="mt-2 text-zinc-700">
                  Use our AI-powered tools to enhance, transform, or create stunning effects.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">Step 3</span>
                <span className="text-xl font-semibold">Download and share</span>
                <span className="mt-2 text-zinc-700">
                  Download your edited media or share it directly from our platform.
                </span>
              </div>
            </li>
          </ol>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/preview.png"
                  alt="uploading preview"
                  width={1419}
                  height={732}
                  quality={100}
                  className="rounded-md w-full h-full object-cover bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-300 sm:text-5xl">
                Powerful AI Features
              </h2>
              <p className="mt-4 text-lg text-zinc-200">
                Our AI-powered editor offers a wide range of features to enhance your photos and videos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <ImageIcon className="w-1/3 h-1/3" />
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-semibold text-zinc-200">Photo Enhancement</h3>
                <p className="mt-3 text-sm text-gray-500">
                  Automatically enhance your photos with AI-powered adjustments for color, contrast, and sharpness.
                </p>
              </div>
            </div>
            <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <Video className="w-1/3 h-1/3" />
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-semibold text-zinc-200">Video Editing</h3>
                <p className="mt-3 text-sm text-gray-500">
                  Edit your videos with AI-assisted tools for trimming, effects, and transitions.
                </p>
              </div>
            </div>
            <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <Check className="w-1/3 h-1/3" />
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-semibold text-zinc-200">Smart Filters</h3>
                <p className="mt-3 text-sm text-gray-500">
                  Apply intelligent filters that adapt to your media content for stunning results.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-zinc-200 sm:text-5xl">
                Ready to transform your media?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Start editing your photos and videos with AI today. No credit card required.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="text-lg">
              <Link
                href="/dashboard"
                target="_blank"
              >
                <span className="flex gap-1 justify-center items-center"> Get started for free <ArrowRight className="ml-2 h-5 w-5" /></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;