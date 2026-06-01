#!/usr/bin/env python3
"""Simple script to display current weather for Sydney, Australia.

This script retrieves weather data from the OpenWeatherMap API using an
API key loaded securely from the OPENWEATHER_API_KEY environment variable.
"""

import os
import sys

import requests


def get_api_key() -> str:
    """Return the OpenWeatherMap API key from the environment."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing OPENWEATHER_API_KEY environment variable."
        )
    return api_key


def fetch_sydney_weather(api_key: str) -> dict:
    """Fetch current weather data for Sydney from OpenWeatherMap."""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": "Geelong,AU",
        "appid": api_key,
        "units": "metric",
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()
    if not isinstance(data, dict):
        raise ValueError("Unexpected API response format.")

    return data


def parse_weather(data: dict) -> tuple[float, str]:
    """Extract temperature and weather conditions from API response."""
    main = data.get("main")
    weather = data.get("weather")

    if not main or "temp" not in main:
        raise KeyError("Temperature data is missing from API response.")

    if not weather or not isinstance(weather, list) or not weather:
        raise KeyError("Weather conditions are missing from API response.")

    temperature = float(main["temp"])
    condition = weather[0].get("description", "Unknown").capitalize()

    return temperature, condition


def main() -> int:
    """Main entry point for the weather script."""
    try:
        api_key = get_api_key()
        weather_data = fetch_sydney_weather(api_key)
        temperature, condition = parse_weather(weather_data)

    except EnvironmentError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    except requests.RequestException as error:
        print(f"Network error while fetching weather data: {error}", file=sys.stderr)
        return 1
    except (ValueError, KeyError) as error:
        print(f"Error parsing weather data: {error}", file=sys.stderr)
        return 1

    print("Current weather for Geelong, Australia:")
    print(f"Temperature: {temperature:.1f}°C")
    print(f"Conditions: {condition}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
