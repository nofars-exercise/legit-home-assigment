const moment = require('moment');
const chalk = require('chalk');

const { VERBOSE } = require('../config');

class GitHubEventHandler {
  constructor() {
  }

  handle(event, eventType) {
    let eventProcessor;
    switch (eventType) {
      case PushEventProcessor.type:
        eventProcessor = new PushEventProcessor(event);
        break;
      case RepoEventProcessor.type:
        eventProcessor = new RepoEventProcessor(event);
        break;
      case TeamEventProcessor.type:
        eventProcessor = new TeamEventProcessor(event);
        break;
      default:
        return;
    }
    eventProcessor.processEvent();
  }
}

class EventProcessor {
  constructor(event) {
    this.event = event;
    this.type = this.constructor.type;
  }
  get message() {
    return null;
  }
  isSuspicious() {
    return false;
  }
  processEvent() {
    if (this.isSuspicious()) {
      console.log(`${chalk.red('Suspicious activity detected!')}\nEvent type: ${this.type}\nMessage: ${this.message}`);
      if (VERBOSE) {
        console.log(chalk.cyan(`\nEvent details: ${this.details}`));
      }
    }
  }
}

class PushEventProcessor extends EventProcessor {
  static type = 'push';
  get message()  {
    return 'Code pushed between 14:00-16:00';
  }
  get details() {
    return `${JSON.stringify(this.event.repository)}\n${JSON.stringify(this.event.commits)}`;
  }
  isSuspicious() {
    return this.event.commits.some((commit) => {
      const date = new Date(commit.timestamp);
      const hour = date.getHours();
      return hour >= 14 && hour < 16;
    });
  }
}

class RepoEventProcessor extends EventProcessor {
  static type = 'repository';
  get message()  {
    return 'Repository deleted within 10 minutes of creation';
  }
  get details() {
    return `${JSON.stringify(this.event.action)}\n${JSON.stringify(this.event.repository)}`;
  }
  isSuspicious() {
    if (this.event.action === 'deleted') {
      const { updated_at, created_at } = this.event.repository;
      const timeRepoExists = moment.duration(moment(updated_at).diff(moment(created_at)));
      return timeRepoExists.asMinutes() < 10;
    }
    return false;
  }
}

class TeamEventProcessor extends EventProcessor {
  static type = 'team';
  get message()  {
    return 'Hacker team created';
  }
  get details() {
    return `${JSON.stringify(this.event.action)}\n${JSON.stringify(this.event.team)}`;
  }
  isSuspicious() {
    if (this.event.action === 'created' || this.event.action === 'added_to_repository') {
      return this.event.team.name.toLowerCase().startsWith('hacker');
    }
    return false;
  }
}

module.exports = { GitHubEventHandler };
