import scrape.ice_arrests
import scrape.ice_clean


def get_data():
    scrape.ice_arrests.main()
    scrape.ice_clean.main()


if __name__ == "__main__":
    get_data()