class Healthcheck {
  protected _intervalId: NodeJS.Timeout | string | number | undefined;

  constructor (
    protected type: 'GET' | 'POST' | string,
    protected url: string,
    protected callback?: (result: { checkedAt: string, status: string }) => void,
  ) {}

  public start(interval: number): void {
    this._intervalId = setInterval(() => {
      fetch(this.url)
        .then(response => {
          if (response.status === 200) {
            this.callback({
              checkedAt: (new Date()).toISOString(),
              status: 'SUCCESS',
            });
          } else {
            this.callback({
              checkedAt: (new Date()).toISOString(),
              status: 'ERROR',
            });
          }
        }).catch(error => {
          this.callback({
            checkedAt: (new Date()).toISOString(),
            status: 'ERROR',
          });
        });
    }, interval * 1000);
  }

  public stop(): void {
    clearInterval(this._intervalId);
  }
}

export default Healthcheck;
