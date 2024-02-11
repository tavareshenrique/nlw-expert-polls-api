type TMessage = { pollOptionId: string; votes: number }
type TSubscriber = (message: TMessage) => void

class VotingPubSub {
  private channels: Record<string, TSubscriber[]> = {}

  subscribe(pollId: string, subscriber: TSubscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
  }

  publish(pollId: string, message: TMessage) {
    if (!this.channels[pollId]) {
      return
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message)
    }
  }
}

export const voting = new VotingPubSub()
