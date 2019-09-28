from selenium import webdriver
import time
from bs4 import BeautifulSoup
import pandas as pd
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By


def main():
    option = webdriver.ChromeOptions()
    option.add_argument("--incognito")

    browser = webdriver.Chrome(executable_path='/Users/dulys/mine/ice_boop/chromedriver', chrome_options=option)

    browser.get("https://trac.syr.edu/phptools/immigration/arrest/")
    time.sleep(8)

    soup = BeautifulSoup(browser.page_source, 'lxml')
    soup.prettify()

    browser.find_element_by_link_text('Colorado').click()

    time.sleep(8)

    soup = BeautifulSoup(browser.page_source, 'lxml')
    soup.prettify()

    df = pd.DataFrame()
    for match in soup.find_all("div", class_="scroll", id="col2"):
        table = match.find("table")
        table_body = match.find('tbody')
        rows = table_body.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            cols = [ele.text.strip() for ele in cols]
            df = df.append(pd.Series([ele for ele in cols if ele]), ignore_index=True)
    df = df.rename(columns={0: "County", 1: "Arrests"})
    county_list = df.copy().County.values

    menu = Select(browser.find_element(
        By.XPATH, "//div[@id='col3head2']/select[@id='dimension_pick_col1']"))
    for item in menu.options:
        this = item.get_attribute("innerText")
        print(this)
        if this == "Month and Year":
            menu.select_by_visible_text("Month and Year")

    time.sleep(8)

    all_counties = pd.DataFrame()
    for county in county_list:
        browser.find_element_by_link_text(county).click()
        time.sleep(5)
        soup = BeautifulSoup(browser.page_source, 'lxml')
        soup.prettify()
        df = pd.DataFrame()
        for match in soup.find_all("div", class_="scroll", id="col3"):
            table = match.find("table")
            table_body = match.find('tbody')
            rows = table_body.find_all('tr')
            for row in rows:
                cols = row.find_all('td')
                cols = [ele.text.strip() for ele in cols]
                df = df.append(pd.Series([ele for ele in cols if ele]), ignore_index=True)
        df = df.rename(columns={0: "MonthYear", 1: "Arrests"})
        df = df.assign(County=county)
        all_counties = all_counties.append(df)

    # all_counties.loc[:, "County"] = all_counties.County.str.replace(", CO", "")
    all_counties.loc[:, "Arrests"] = all_counties.Arrests.str.replace(",", "").astype(int)
    all_counties.to_csv("month_year_co_counties_arrest.csv", index=False)


